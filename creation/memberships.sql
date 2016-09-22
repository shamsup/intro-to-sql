CREATE TABLE `intro_to_sql`.`memberships` (
  `clan_id` INT NOT NULL,
  `player_id` INT NOT NULL,
  PRIMARY KEY (`clan_id`, `player_id`));

INSERT INTO `intro_to_sql`.`memberships`
  (clan_id, player_id)
  VALUES
    ( 20, 10 ),
    ( 20,  13 ),
    ( 21, 11 ),
    ( 21, 12 );
