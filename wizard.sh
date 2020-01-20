#!/bin/bash

PS3='What do: '
options=("Install and configure for development" "Spin up development" "EXIT")
select opt in "${options[@]}"
do
    case $opt in
        "Install and configure for development")

            # Still need to ensure user has node, docker-compose installed


            # Configure HASURA API
            cd api
            read -p "Create and configure a .env file for HASURA by pressing enter"
            touch .env
            read -p "Enter database URL [postgres://postgres:@postgres:5432/postgres]" dburl
            dburl=${dburl:-postgres://postgres:@postgres:5432/postgres}
            # This needs to be false so we can automagically apply migrations, 
            # change also requires to change variable to be used
            # read -p "Do you want to enable console (default true)?" enableconsole
            read -p "Enter enabled log types (default startup, http-log, webhook-log, websocket-log, query-log)" logtypes
            read -p "Enter admin secret" adminsecret
            read -p "Enter JWT secret" jwtsecret
            echo "HASURA_GRAPHQL_DATABASE_URL=$dburl" >> .env
            echo "HASURA_GRAPHQL_ENABLE_CONSOLE=false" >> .env
            echo "HASURA_GRAPHQL_ENABLED_LOG_TYPES=$logtypes" >> .env
            echo "HASURA_GRAPHQL_ADMIN_SECRET=$adminsecret" >> .env
            echo "HASURA_GRAPHQL_JWT_SECRET=$jwtsecret" >> .env
            clear
            # Apply migrations
            hasura migrate apply --endpoint $dburl

            read -p "Configure ready, press enter to spin development up!"
            docker-compose up &

            # Configure Node.js backend
            cd ../backend
            clear
            read -p "Create and configure a config file for BACKEND by pressing enter"
            touch config/default.json
            read -p "Enter a private key: "  privatekey
            read -p "Enter a GraphQL URL: "  gqlurl
            echo -e "{\"myprivatekey\":\""$privatekey"\", \"graphql_url\":\""$gqlurl"\"}" >> config/default.json
            clear
            read -p "Create and configure a .env file by pressing enter"            
            # touch .env
            # echo "PRIVATE_KEY=$privatekey" >> .env
            # echo "GRAPHQL_URL=$gqlurl" >> .env
            # read -p ".env created! Press enter to continue"
            # clear
            # read -p "Install node modules by pressing enter"
            # npm install
            # npm run watch &

            # Configure React frontend
            cd ../frontend
            clear
            npm install
            npm start &

            # Run until a key is pressed
            read -p "Development is running. Quit by pressing enter."
            break
            ;;
        "Spin up development")
            echo "you chose choice 2"
            ;;
        "EXIT")
            break
            ;;
        *) echo "$REPLY is not a valid option! :(";;
    esac
done