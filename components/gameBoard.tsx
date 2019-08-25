import React from "react";

import PlayedCards from "./playedCards";
import TokenSpace from "./tokenSpace";
import Button from "./ui/button";
import {
  getScore,
  getMaximumScore,
  getMaximumPossibleScore
} from "../game/actions";
import { CardWrapper } from "./card";
import { useGame } from "../hooks/game";
import Box from "~/components/ui/box";

interface Props {
  onSelectDiscard: Function;
  onMenuClick: Function;
  onLogsClick: Function;
  onRollback: Function;
}

export default function GameBoard(props: Props) {
  const { onSelectDiscard, onMenuClick, onLogsClick, onRollback } = props;

  const game = useGame();
  const score = getScore(game);
  const maxScore = getMaximumScore(game);
  const maxPossibleScore = getMaximumPossibleScore(game);

  return (
    <Box className="mb2 mb3-l">
      <div className="f6 f4-l ttu">
        Score: {score} / {maxPossibleScore}
        {maxScore !== maxPossibleScore && (
          <span className="strike ml1 gray">{maxScore}</span>
        )}
        {game.actionsLeft <= game.options.playersCount && (
          <div className="ml2 inline-flex">
            ·<span className="red ml2">{game.actionsLeft} turns left</span>
          </div>
        )}
      </div>
      <div className="flex flex-column-l justify-between mt1">
        <div className="flex flex-column">
          <PlayedCards cards={game.playedCards} />
        </div>
        <div className="flex flex-row ph1 justify-left mt1 items-center">
          <TokenSpace hints={game.tokens.hints} strikes={game.tokens.strikes} />
          <div className="mr2 relative">
            <CardWrapper color="light-silver">
              {game.drawPile.map((card, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{ top: `-${i / 2}px` }}
                >
                  <CardWrapper key={card.id} color="light-silver">
                    {i + 1}
                  </CardWrapper>
                </div>
              ))}
            </CardWrapper>
          </div>
          <div className="pointer relative" onClick={() => onSelectDiscard()}>
            <CardWrapper color="light-silver">
              {game.discardPile.map((card, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{ top: `-${i / 2}px` }}
                >
                  <CardWrapper key={card.id} color="light-silver">
                    {i + 1}
                  </CardWrapper>
                </div>
              ))}
            </CardWrapper>
          </div>
          <div className="flex ml2">
            {game.options.allowRollback && (
              <Button disabled={!history.length} onClick={onRollback}>
                ⟲
              </Button>
            )}
            <Button onClick={onLogsClick}>?</Button>
            <Button onClick={onMenuClick}>☰</Button>
          </div>
        </div>
      </div>
    </Box>
  );
}