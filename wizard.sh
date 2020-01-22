#!/bin/bash

clear
green=`tput setaf 2`
reset=`tput sgr0`

PS3='What do: '
options=("Install and configure for development" "Spin up development" "EXIT")
select opt in "${options[@]}"
do
    case $opt in
        "Install and configure for development")

            # Still need to ensure user has node, docker-compose installed

            # Get directory
            pwd=$(pwd)

            # Confirm config overwrite
            if [[ -f ./backend/config/default.json || -f ./api/.env ]]; then
                clear
                options2=("Overwrite config" "Cancel")
                select opt2 in "${options2[@]}"
                do
                    case $opt2 in
                        "Overwrite config")
                            rm -f $pwd/api/.env
                            rm -f $pwd/backend/config/default.json
                            break
                            ;;
                        "Cancel")
                            break
                            ;;
                        *) echo "$REPLY is not a valid option! 🙁";;
                    esac
                done
            fi

            # Make sure node is not running to avoid collision
            if pgrep -x "node" 2> /dev/null; then killall node; fi

            # Make sure prerequisites are met
            if hash hasura 2>/dev/null; then
                clear
            else
                echo "Install Hasura"
                break
            fi

            if hash node 2>/dev/null; then
                clear
            else
                echo "Install Node.js"
                break
            fi

            # Configure HASURA API
            touch $pwd/api/.env
            read -p "Enter database URL [postgres://postgres:@postgres:5432/postgres]" dburl
            dburl=${dburl:-postgres://postgres:@postgres:5432/postgres}
            # This needs to be false so we can automagically apply migrations, 
            # change also requires to change variable to be used
            # read -p "Do you want to enable console (default true)?" enableconsole
            read -p "Enter enabled log types [startup, http-log, webhook-log, websocket-log, query-log]" logtypes
            logtypes=${logtypes:-startup, http-log, webhook-log, websocket-log, query-log}
            read -p "Enter admin secret: " adminsecret
            read -p "Enter JWT secret (min. 32 char): " jwtsecret
            read -p "Enter a GraphQL URL [http://localhost:8080/v1/graphql]: "  gqlurl
            gqlurl=${gqlurl:-http://localhost:8080/v1/graphql}

            echo "HASURA_GRAPHQL_DATABASE_URL=$dburl" >> $pwd/api/.env
            echo "HASURA_GRAPHQL_ENABLE_CONSOLE=false" >> $pwd/api/.env
            echo "HASURA_GRAPHQL_ENABLED_LOG_TYPES=$logtypes" >> $pwd/api/.env
            echo "HASURA_GRAPHQL_ADMIN_SECRET=$adminsecret" >> $pwd/api/.env
            echo "HASURA_GRAPHQL_JWT_SECRET={\"type\":\"HS256\", \"key\":\""$jwtsecret"\"}"  >> $pwd/api/.env
            clear
            echo "Booting up Hasura..."
            printf "\n"
            cd $pwd/api
            docker-compose up --detach 2> /dev/null

            # Apply migrations
            cd $pwd/hasura/migrations/1577946609171_init
            hasura migrate apply --endpoint ${gqlurl%v1/graphql} --admin-secret ${adminsecret} > /dev/null &

            # Configure Node.js backend
            echo "${green}Hasura online${reset}"
            printf "\n"
            echo "Booting up backend..."
            printf "\n"
            touch $pwd/backend/config/default.json
            echo -e "{\"myprivatekey\":\""$jwtsecret"\", \"graphql_url\":\""$gqlurl"\"}" >> $pwd/backend/config/default.json       

            cd $pwd/backend
            npm install &> /dev/null
            npm install nodemon -g &> /dev/null
            nohup nodemon index.js &

            # Configure React frontend
            cd $pwd/frontend
            echo "${green}Backend online${reset}"
            printf "\n"
            echo "Booting up frontend..."
            printf "\n"
            npm install &> /dev/null
            nohup npm start &

            # Run until a key is pressed
            echo "${green}Frontend online${reset}"
            printf "\n"
            printf "\n"
            printf "\n"
            read -p "${green}Development is running. Quit by pressing enter.${reset} \n"
            printf "\n"
            # Clean up
            if pgrep -x "node" &> /dev/null; then killall node; fi
            break
            ;;
        "Spin up development")
            echo "Spinning..."
            ;;
        "EXIT")
            break
            ;;
        *) echo "$REPLY is not a valid option! :(";;
    esac
done