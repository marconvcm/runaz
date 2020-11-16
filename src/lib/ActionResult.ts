import { Player } from "./Player";

export interface ActionResult {
  run(target: Player): void;
}

export class AttackResult implements ActionResult {

  constructor(private damage: number) { }

  run(target: Player): void {

  }
}

export class DefenseResult implements ActionResult {

  constructor() { }

  run(target: Player): void {

  }
}
