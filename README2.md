
# Dev terminals
- bash (git)
- next (npm next build.. for dev)
- server (node server API)
- seed (sql seeding for testing)

# To Run Project

`npm run` following cmnds
"dev": "next dev",
"build": "next build",
"start": "next start",

## Personal cmnds (server, db)
Run following to boot up API server
`npm run server`
Run following to seed DB
`cd ./server/db`
`mysql -u root -p yourPassword < schema.sql`
..same for `seed.sql`

## npm run dev
This will run dev server, live refreshes, etc
## npm run build + start
`Build` will build your project for production
`Start` will run the server (ready for next linking)


