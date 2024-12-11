export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <title>Windy Notes</title>
        <meta name="description" content="Application d'interprétation trilingue avec versets bibliques" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
