"use server";

import { db } from "~/server/db";
import { enforceLoggedIn } from "../utils/enforceLoggedIn";
import type { ITeam } from "~/app/dashboard/equipes/_components/model";
import { Prisma } from "@prisma/client";

export const getTeams = async () => {
	const session = await enforceLoggedIn();

	const teams = await db.team.findMany({
		where: {
			userId: session.user.id,
		},
	});

	return teams;
};

export const createTeam = async (teamName: string) => {
	const session = await enforceLoggedIn();

	// verify if teamName exists in db
	const DoesTeamExists = await db.team.findFirst({
		where: {
			userId: session.user.id,
			name: teamName,
		},
	});

	// if teamName exists, throw error
	if (DoesTeamExists) {
		throw new Error("O nome da equipe já existe.");
	}

	// create team
	const data = {
		name: teamName,
		userId: session.user.id,
		usersEmails: [],
	};

	const team = await db.team.create({
		data,
	});

	return team;
};

export const deleteTeam = async (teamId: string) => {
	const session = await enforceLoggedIn();

	// get all teams of the user
	const teams = await db.team.findMany({
		where: {
			userId: session.user.id,
		},
	});

	// if the teamId exists, delete it
	const team = teams.find((team) => team.id === teamId);
	if (team) {
		await db.team.delete({
			where: {
				id: teamId,
			},
		});
		return;
	}
}


export const updateTeam = async ({ teamId, emails }: { teamId: string, emails: string[] }) => {
	
	try {
		const validData: Prisma.TeamUpdateInput = {
			usersEmails: emails,
		};

		const team = await db.team.update({
			where: {
				id: teamId,
			},
			data: {
				...validData,
			},
		});

		return team;

	} catch {
		throw new Error("Internal Error");
	}
};
