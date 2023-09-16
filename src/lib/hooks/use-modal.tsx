import { create } from "zustand";

type State = {
	show: boolean;
	modals: string[];
};

type Action = {
	addModal: ({ key }: { key: string }) => void;
	removeModal: ({ key }: { key: string }) => void;
};

export const useModal = create<State & Action>((set) => ({
	show: false,
	modals: [],
	addModal: ({ key }: { key: string }) =>
		set((state) => ({
			show: true,
			modals: [...state.modals, key],
		})),
	removeModal: ({ key }: { key: string }) =>
		set((state) => {
			const newModals = state.modals.filter(
				(stateKey) => key !== stateKey
			);
			console.log(newModals);
			return {
				show: newModals.length > 0 ? true : false,
				modals: newModals,
			};
		}),
}));
