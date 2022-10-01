export const GAME_WIDTH = 1200;
export const GAME_HEIGHT = 600;

export const DEFENDER = {
    huntress: {
        health: 100,
        skills: [
            {
                name: "ATK1",
                src: "Attack1.png",
                dame: 5,
                slowEnemy: 0.01,
                attackSpeed: 0.2,
                attackRange: GAME_WIDTH * 0.5,
            },
            {
                name: "ATK2",
                src: "Attack2.png",
                dame: 5,
                slowEnemy: 0.01,
                attackSpeed: 0.2,
                attackRange: 50,
            },
        ],
    },
    worm: {
        health: 200,
        skills: [
            {
                name: "ATK1",
                src: "Attack1.png",
                dame: 50,
                slowEnemy: 0.009,
                attackSpeed: 0.15,
                attackRange: GAME_WIDTH * 0.4,
            },
            {
                name: "ATK2",
                src: "Attack2.png",
                dame: 50,
                slowEnemy: 0.009,
                attackSpeed: 0.15,
                attackRange: 50,
            },
        ],
    },
    evilWizard: {
        health: 300,

        skills: [
            {
                name: "ATK1",
                src: "Attack1.png",
                attackRange: GAME_WIDTH * 0.5,
                dame: 5,
                slowEnemy: 0,
                attackSpeed: 0.1,
                attackRange: GAME_WIDTH * 0.4,
            },
            {
                name: "ATK2",
                src: "Attack2.png",
                attackRange: 50,
                dame: 5,
                slowEnemy: 0,
                attackSpeed: 0.1,
                attackRange: GAME_WIDTH * 0.3,
            },
        ],
    },
    wizardPack: {
        health: 500,
        skills: [
            {
                name: "ATK1",
                src: "Attack1.png",
                dame: 100,
                slowEnemy: 0,
                attackSpeed: 0.1,
                attackRange: GAME_WIDTH * 0.5,
            },

            {
                name: "ATK2",
                src: "Attack2.png",
                dame: 5,
                slowEnemy: 0,
                attackSpeed: 0.1,
                attackRange: GAME_WIDTH * 0.2,
            },
        ],
    },
};

export const ENEMY = {
    wiard: {
        health: 80000,
        dame: 1,
        speed: Math.random() * 0.8 + 0.2,
    },
    bolbMinion: {
        health: 1500,
        dame: 2,
        speed: Math.random() * 0.5 + 0.1,
    },
};
