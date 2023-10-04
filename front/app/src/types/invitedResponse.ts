export type InvitedResponse = {
  is_Private: boolean;
  nicknames: NickNames[];
  team_title: string;
};
export type NickNames={
  nickname:string;
  id:number;
}