export default {
  translation: {
    app: {
      title: "Pétanque Turnering",
      subtitle: "Administrer din Pétanque turnering med lethed",
    },
    buttons: {
      startTournament: "Start Turnering",
      reset: "Nulstil",
      addTeam: "Tilføj Hold",
      addPlayer: "Tilføj Spiller",
    },
    teamSetup: {
      title: "Holdopsætning",
      description:
        "Tilføj hold og spillere. Du skal bruge et lige antal hold (2, 4, 8, osv.)",
      teamName: "Holdnavn",
      teamNamePlaceholder: "Indtast holdnavn...",
      noTeams:
        "Ingen hold tilføjet endnu. Tilføj dit første hold for at komme i gang!",
      oddTeamsWarning:
        "⚠️ Du har {{count}} hold. Tilføj venligst et hold mere for at få et lige antal.",
      oddTeamsWarning_plural:
        "⚠️ Du har {{count}} hold. Tilføj venligst et hold mere for at få et lige antal.",
      teamsWithoutPlayers:
        "⚠️ Nogle hold har ingen spillere. Tilføj venligst mindst én spiller til hvert hold før start af turneringen.",
      needMoreTeams:
        "⚠️ Du skal have mindst 2 hold for at starte en turnering.",
      noPlayers: "Ingen spillere endnu",
      playerCount: "{{count}} spiller",
      playerCount_plural: "{{count}} spillere",
    },
    playerDialog: {
      title: "Tilføj Spiller til {{teamName}}",
      description: "Indtast spillerens navn eller alias",
      playerName: "Spillernavn",
      playerNamePlaceholder: "Indtast spillernavn...",
    },
    tournament: {
      title: "Turneringsoversigt - Runde {{round}}",
      description:
        "Klik på det vindende hold for at rykke dem videre til næste runde",
      champion: "Mester",
      vs: "VS",
      roundComplete:
        "✅ Runde {{current}} færdig! Scroll ned for at se Runde {{next}}",
    },
    previousRounds: {
      title: "Tidligere Runder",
      description: "Turneringshistorik",
      round: "Runde {{round}}",
      vs: "mod",
    },
    confirmReset:
      "Er du sikker på, at du vil nulstille turneringen? Dette vil slette alle data.",
  },
};
