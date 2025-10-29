import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Player {
  id: string;
  name: string;
}

export interface Team {
  id: string;
  name: string;
  players: Player[];
}

export interface Match {
  id: string;
  team1Id: string;
  team2Id: string;
  winnerId: string | null;
  round: number;
}

interface TournamentState {
  teams: Team[];
  matches: Match[];
  currentRound: number;
  tournamentStarted: boolean;
}

const initialState: TournamentState = {
  teams: [],
  matches: [],
  currentRound: 1,
  tournamentStarted: false,
};

const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    addTeam: (state, action: PayloadAction<{ name: string }>) => {
      const newTeam: Team = {
        id: crypto.randomUUID(),
        name: action.payload.name,
        players: [],
      };
      state.teams.push(newTeam);
    },

    removeTeam: (state, action: PayloadAction<string>) => {
      state.teams = state.teams.filter((team) => team.id !== action.payload);
    },

    addPlayerToTeam: (
      state,
      action: PayloadAction<{ teamId: string; playerName: string }>
    ) => {
      const team = state.teams.find((t) => t.id === action.payload.teamId);
      if (team) {
        team.players.push({
          id: crypto.randomUUID(),
          name: action.payload.playerName,
        });
      }
    },

    removePlayerFromTeam: (
      state,
      action: PayloadAction<{ teamId: string; playerId: string }>
    ) => {
      const team = state.teams.find((t) => t.id === action.payload.teamId);
      if (team) {
        team.players = team.players.filter(
          (p) => p.id !== action.payload.playerId
        );
      }
    },

    startTournament: (state) => {
      if (state.teams.length >= 2 && state.teams.length % 2 === 0) {
        state.tournamentStarted = true;
        state.currentRound = 1;
        state.matches = [];

        // Create first round matches
        const shuffledTeams = [...state.teams].sort(() => Math.random() - 0.5);
        for (let i = 0; i < shuffledTeams.length; i += 2) {
          state.matches.push({
            id: crypto.randomUUID(),
            team1Id: shuffledTeams[i].id,
            team2Id: shuffledTeams[i + 1].id,
            winnerId: null,
            round: 1,
          });
        }
      }
    },

    setMatchWinner: (
      state,
      action: PayloadAction<{ matchId: string; winnerId: string }>
    ) => {
      const match = state.matches.find((m) => m.id === action.payload.matchId);
      if (match) {
        match.winnerId = action.payload.winnerId;

        // Check if all matches in current round are complete
        const currentRoundMatches = state.matches.filter(
          (m) => m.round === state.currentRound
        );
        const allComplete = currentRoundMatches.every(
          (m) => m.winnerId !== null
        );

        if (allComplete) {
          const winners = currentRoundMatches.map((m) => m.winnerId!);

          // If more than one winner, create next round
          if (winners.length > 1) {
            state.currentRound += 1;
            for (let i = 0; i < winners.length; i += 2) {
              state.matches.push({
                id: crypto.randomUUID(),
                team1Id: winners[i],
                team2Id: winners[i + 1],
                winnerId: null,
                round: state.currentRound,
              });
            }
          }
        }
      }
    },

    resetTournament: () => initialState,
  },
});

export const {
  addTeam,
  removeTeam,
  addPlayerToTeam,
  removePlayerFromTeam,
  startTournament,
  setMatchWinner,
  resetTournament,
} = tournamentSlice.actions;

export default tournamentSlice.reducer;
