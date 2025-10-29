import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addTeam,
  removeTeam,
  addPlayerToTeam,
  removePlayerFromTeam,
  startTournament,
  setMatchWinner,
  resetTournament,
} from "@/store/tournamentSlice";
import { toggleTheme } from "@/store/themeSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Trophy,
  Users,
  Plus,
  Trash2,
  Play,
  RotateCcw,
  Medal,
  Moon,
  Sun,
  Languages,
} from "lucide-react";

export default function TournamentApp() {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const { teams, matches, currentRound, tournamentStarted } = useAppSelector(
    (state) => state.tournament
  );
  const theme = useAppSelector((state) => state.theme.mode);

  const [newTeamName, setNewTeamName] = useState("");
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddTeam = () => {
    if (newTeamName.trim() && !tournamentStarted) {
      dispatch(addTeam({ name: newTeamName.trim() }));
      setNewTeamName("");
    }
  };

  const handleAddPlayer = (teamId: string) => {
    if (newPlayerName.trim()) {
      dispatch(addPlayerToTeam({ teamId, playerName: newPlayerName.trim() }));
      setNewPlayerName("");
      setDialogOpen(false);
    }
  };

  const handleStartTournament = () => {
    if (teams.length >= 2 && teams.length % 2 === 0) {
      dispatch(startTournament());
    }
  };

  const handleSetWinner = (matchId: string, winnerId: string) => {
    dispatch(setMatchWinner({ matchId, winnerId }));
  };

  const handleReset = () => {
    if (confirm(t("confirmReset"))) {
      dispatch(resetTournament());
    }
  };

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "da" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  const getTeamById = (id: string) => teams.find((t) => t.id === id);

  const currentRoundMatches = matches.filter((m) => m.round === currentRound);
  const isRoundComplete = currentRoundMatches.every((m) => m.winnerId !== null);
  const champion =
    isRoundComplete && currentRoundMatches.length === 1
      ? getTeamById(currentRoundMatches[0].winnerId!)
      : null;

  // Validation checks
  const hasTeamsWithoutPlayers = teams.some((team) => team.players.length === 0);

  const canStartTournament =
    teams.length >= 2 && 
    teams.length % 2 === 0 && 
    !tournamentStarted &&
    !hasTeamsWithoutPlayers;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-indigo-50 to-purple-100 dark:from-gray-950 dark:via-slate-900 dark:to-indigo-950 p-4 md:p-8 relative overflow-hidden">
      {/* Animated background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 -left-1/4 w-96 h-96 bg-purple-300/30 dark:bg-purple-600/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-pulse"></div>
        <div className="absolute top-0 -right-1/4 w-96 h-96 bg-indigo-300/30 dark:bg-indigo-600/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute -bottom-8 left-1/3 w-96 h-96 bg-pink-300/30 dark:bg-pink-600/20 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-3xl animate-pulse" style={{ animationDelay: "4s" }}></div>
      </div>

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">
        {/* Header */}
        <div className="text-center space-y-2 relative">
          {/* Control Buttons Row */}
          <div className="absolute right-0 top-0 flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleLanguage}
              className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
              title={
                i18n.language === "en"
                  ? "Switch to Danish"
                  : "Skift til Engelsk"
              }
            >
              <Languages className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => dispatch(toggleTheme())}
              className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="flex items-center justify-center gap-3">
            <Trophy className="h-12 w-12 text-amber-500 drop-shadow-lg" />
            <h1 className="text-5xl font-bold text-slate-900 dark:text-white drop-shadow-sm">
              {t("app.title")}
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-300 text-lg">
            {t("app.subtitle")}
          </p>
        </div>

        {/* Control Buttons */}
        <div className="flex justify-center gap-3">
          {!tournamentStarted && (
            <Button
              onClick={handleStartTournament}
              disabled={!canStartTournament}
              size="lg"
              className="gap-2"
            >
              <Play className="h-5 w-5" />
              {t("buttons.startTournament")}
            </Button>
          )}
          <Button
            onClick={handleReset}
            variant="destructive"
            size="lg"
            className="gap-2"
          >
            <RotateCcw className="h-5 w-5" />
            {t("buttons.reset")}
          </Button>
        </div>

        {/* Team Setup Section */}
        {!tournamentStarted && (
          <Card className="backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                {t("teamSetup.title")}
              </CardTitle>
              <CardDescription>{t("teamSetup.description")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add Team Form */}
              <div className="flex gap-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="team-name">{t("teamSetup.teamName")}</Label>
                  <Input
                    id="team-name"
                    placeholder={t("teamSetup.teamNamePlaceholder")}
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddTeam()}
                  />
                </div>
                <Button onClick={handleAddTeam} className="mt-auto gap-2">
                  <Plus className="h-4 w-4" />
                  {t("buttons.addTeam")}
                </Button>
              </div>

              {/* Teams Display */}
              {teams.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
                  {teams.map((team) => (
                    <Card
                      key={team.id}
                      className="relative shadow-md hover:shadow-lg transition-shadow"
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center justify-between">
                          <span className="truncate">{team.name}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => dispatch(removeTeam(team.id))}
                            className="h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {/* Players List */}
                        <div className="space-y-1 min-h-[60px]">
                          {team.players.map((player) => (
                            <div
                              key={player.id}
                              className="flex items-center justify-between bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm"
                            >
                              <span className="truncate">{player.name}</span>
                              <button
                                onClick={() =>
                                  dispatch(
                                    removePlayerFromTeam({
                                      teamId: team.id,
                                      playerId: player.id,
                                    })
                                  )
                                }
                                className="text-red-500 hover:text-red-700 ml-2"
                              >
                                <Trash2 className="h-3 w-3" />
                              </button>
                            </div>
                          ))}
                          {team.players.length === 0 && (
                            <p className="text-sm text-slate-500 italic">
                              {t("teamSetup.noPlayers")}
                            </p>
                          )}
                        </div>

                        {/* Add Player Dialog */}
                        <Dialog
                          open={dialogOpen && selectedTeamId === team.id}
                          onOpenChange={(open) => {
                            setDialogOpen(open);
                            if (open) setSelectedTeamId(team.id);
                            else {
                              setSelectedTeamId(null);
                              setNewPlayerName("");
                            }
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className="w-full gap-2"
                              onClick={() => setSelectedTeamId(team.id)}
                            >
                              <Plus className="h-3 w-3" />
                              {t("buttons.addPlayer")}
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                {t("playerDialog.title", {
                                  teamName: team.name,
                                })}
                              </DialogTitle>
                              <DialogDescription>
                                {t("playerDialog.description")}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 pt-4">
                              <div className="space-y-2">
                                <Label htmlFor="player-name">
                                  {t("playerDialog.playerName")}
                                </Label>
                                <Input
                                  id="player-name"
                                  placeholder={t(
                                    "playerDialog.playerNamePlaceholder"
                                  )}
                                  value={newPlayerName}
                                  onChange={(e) =>
                                    setNewPlayerName(e.target.value)
                                  }
                                  onKeyDown={(e) =>
                                    e.key === "Enter" &&
                                    handleAddPlayer(team.id)
                                  }
                                />
                              </div>
                              <Button
                                onClick={() => handleAddPlayer(team.id)}
                                className="w-full"
                              >
                                {t("buttons.addPlayer")}
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {teams.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  <Users className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>{t("teamSetup.noTeams")}</p>
                </div>
              )}

              {teams.length > 0 && teams.length < 2 && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
                  <p className="text-red-800 dark:text-red-200 font-medium">
                    {t("teamSetup.needMoreTeams")}
                  </p>
                </div>
              )}

              {teams.length > 0 && teams.length % 2 !== 0 && (
                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 text-center">
                  <p className="text-amber-800 dark:text-amber-200 font-medium">
                    {t("teamSetup.oddTeamsWarning", { count: teams.length })}
                  </p>
                </div>
              )}

              {hasTeamsWithoutPlayers && teams.length >= 2 && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
                  <p className="text-red-800 dark:text-red-200 font-medium">
                    {t("teamSetup.teamsWithoutPlayers")}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Tournament Bracket */}
        {tournamentStarted && (
          <div className="flex justify-center">
            <Card className="w-full max-w-5xl backdrop-blur-sm bg-white/80 dark:bg-slate-900/80">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-center">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  {t("tournament.title", { round: currentRound })}
                </CardTitle>
                <CardDescription className="text-center">
                  {t("tournament.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Champion Display */}
                {champion && (
                  <div className="mb-8 text-center">
                    <div className="inline-flex flex-col items-center gap-3 bg-linear-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-2 border-amber-400 dark:border-amber-600 rounded-lg p-6">
                      <Medal className="h-16 w-16 text-amber-500" />
                      <div>
                        <p className="text-sm font-medium text-amber-700 dark:text-amber-400 uppercase tracking-wide">
                          {t("tournament.champion")}
                        </p>
                        <h2 className="text-3xl font-bold text-amber-900 dark:text-amber-100">
                          {champion.name}
                        </h2>
                      </div>
                    </div>
                  </div>
                )}

                {/* Matches Grid */}
                <div className={`grid gap-4 ${currentRoundMatches.length === 1 ? 'grid-cols-1 max-w-md mx-auto' : 'grid-cols-1 md:grid-cols-2'}`}>
                  {currentRoundMatches.map((match) => {
                    const team1 = getTeamById(match.team1Id);
                    const team2 = getTeamById(match.team2Id);

                    return (
                      <Card
                        key={match.id}
                        className={
                          match.winnerId
                            ? "bg-slate-50 dark:bg-slate-900"
                            : "border-2 border-blue-300 dark:border-blue-700"
                        }
                      >
                        <CardContent className="p-4 space-y-2">
                          {/* Team 1 */}
                          <button
                            onClick={() =>
                              !match.winnerId &&
                              handleSetWinner(match.id, match.team1Id)
                            }
                            disabled={!!match.winnerId}
                            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                              match.winnerId === match.team1Id
                                ? "bg-green-100 dark:bg-green-900/30 border-green-500 font-bold"
                                : match.winnerId
                                ? "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 opacity-50"
                                : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold">{team1?.name}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  {t("teamSetup.playerCount", {
                                    count: team1?.players.length || 0,
                                  })}
                                </p>
                              </div>
                              {match.winnerId === match.team1Id && (
                                <Trophy className="h-5 w-5 text-green-600" />
                              )}
                            </div>
                          </button>

                          <div className="text-center text-sm font-medium text-slate-500">
                            {t("tournament.vs")}
                          </div>

                          {/* Team 2 */}
                          <button
                            onClick={() =>
                              !match.winnerId &&
                              handleSetWinner(match.id, match.team2Id)
                            }
                            disabled={!!match.winnerId}
                            className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                              match.winnerId === match.team2Id
                                ? "bg-green-100 dark:bg-green-900/30 border-green-500 font-bold"
                                : match.winnerId
                                ? "bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 opacity-50"
                                : "bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold">{team2?.name}</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">
                                  {t("teamSetup.playerCount", {
                                    count: team2?.players.length || 0,
                                  })}
                                </p>
                              </div>
                              {match.winnerId === match.team2Id && (
                                <Trophy className="h-5 w-5 text-green-600" />
                              )}
                            </div>
                          </button>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Round Complete Message */}
                {!champion &&
                  isRoundComplete &&
                  currentRoundMatches.length > 1 && (
                    <div className="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
                      <p className="text-green-800 dark:text-green-200 font-medium">
                        {t("tournament.roundComplete", {
                          current: currentRound,
                          next: currentRound + 1,
                        })}
                      </p>
                    </div>
                  )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Previous Rounds */}
        {tournamentStarted && currentRound > 1 && (
          <div className="flex justify-center">
            <Card className="w-full max-w-5xl backdrop-blur-sm bg-white/80 dark:bg-slate-900/80">
              <CardHeader>
                <CardTitle>{t("previousRounds.title")}</CardTitle>
                <CardDescription>
                  {t("previousRounds.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {Array.from({ length: currentRound - 1 }, (_, i) => i + 1)
                  .reverse()
                  .map((round) => {
                    const roundMatches = matches.filter(
                      (m) => m.round === round
                    );
                    return (
                      <div key={round}>
                        <h3 className="font-semibold mb-3 text-sm text-slate-600 dark:text-slate-400">
                          {t("previousRounds.round", { round })}
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                          {roundMatches.map((match) => {
                            const team1 = getTeamById(match.team1Id);
                            const team2 = getTeamById(match.team2Id);
                            return (
                              <div
                                key={match.id}
                                className="bg-slate-50 dark:bg-slate-900 rounded-lg p-3 space-y-1 text-sm"
                              >
                                <div
                                  className={
                                    match.winnerId === match.team1Id
                                      ? "font-bold text-green-700 dark:text-green-400"
                                      : "text-slate-500"
                                  }
                                >
                                  {team1?.name}{" "}
                                  {match.winnerId === match.team1Id && "🏆"}
                                </div>
                                <div className="text-xs text-slate-400">
                                  {t("previousRounds.vs")}
                                </div>
                                <div
                                  className={
                                    match.winnerId === match.team2Id
                                      ? "font-bold text-green-700 dark:text-green-400"
                                      : "text-slate-500"
                                  }
                                >
                                  {team2?.name}{" "}
                                  {match.winnerId === match.team2Id && "🏆"}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
