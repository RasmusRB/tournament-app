export default {
  translation: {
    app: {
      title: "Pétanque Tournament",
      subtitle: "Manage your Pétanque tournament with ease",
    },
    buttons: {
      startTournament: "Start Tournament",
      reset: "Reset",
      addTeam: "Add Team",
      addPlayer: "Add Player",
    },
    teamSetup: {
      title: "Team Setup",
      description:
        "Add teams and players. You need an even number of teams (2, 4, 8, etc.)",
      teamName: "Team Name",
      teamNamePlaceholder: "Enter team name...",
      noTeams: "No teams added yet. Add your first team to get started!",
      oddTeamsWarning:
        "⚠️ You have {{count}} team. Please add one more team to make an even number.",
      oddTeamsWarning_plural:
        "⚠️ You have {{count}} teams. Please add one more team to make an even number.",
      teamsWithoutPlayers:
        "⚠️ Some teams don't have any players. Please add at least one player to each team before starting the tournament.",
      needMoreTeams: "⚠️ You need at least 2 teams to start a tournament.",
      noPlayers: "No players yet",
      playerCount: "{{count}} player",
      playerCount_plural: "{{count}} players",
    },
    playerDialog: {
      title: "Add Player to {{teamName}}",
      description: "Enter the player's name or alias",
      playerName: "Player Name",
      playerNamePlaceholder: "Enter player name...",
    },
    tournament: {
      title: "Tournament Bracket - Round {{round}}",
      description:
        "Click on the winning team to advance them to the next round",
      champion: "Champion",
      vs: "VS",
      roundComplete:
        "✅ Round {{current}} complete! Scroll down to see Round {{next}}",
    },
    previousRounds: {
      title: "Previous Rounds",
      description: "Tournament history",
      round: "Round {{round}}",
      vs: "vs",
    },
    confirmReset:
      "Are you sure you want to reset the tournament? This will clear all data.",
  },
};
