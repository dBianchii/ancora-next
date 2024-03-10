"use server"

import { enforceLoggedIn } from "~/server/utils/enforceLoggedIn";

export const createTeam = async (
	teamName: string
) => {
	const session = await enforceLoggedIn();
	
	//TODO: create team
}




