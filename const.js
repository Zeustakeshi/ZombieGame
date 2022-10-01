export const GAME_WIDTH = 1200;
export const GAME_HEIGHT = 600;

export const DEFENDER = {
    huntress: {
        id: 1,
        name: "HUNTRESS",
        health: 100,
        rootSrc: "assets/defenders/Huntress 2",
        spriteWidth: 100,
        spriteHeight: 100,
        cost: 500,
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
        id: 2,
        name: "WORM",
        health: 200,
        rootSrc: "assets/defenders/Worm",
        spriteWidth: 90,
        spriteHeight: 90,
        cost: 1000,
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
        id: 3,
        name: "EVILWIZARD",
        health: 300,
        rootSrc: "assets/defenders/EVil Wizard 2",
        spriteWidth: 250,
        spriteHeight: 250,
        cost: 1800,
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
        id: 4,
        name: "WIZARDPACK",
        health: 500,
        rootSrc: "assets/defenders/Wizard Pack",
        spriteWidth: 231,
        spriteHeight: 190,
        cost: 2000,
        skills: [
            {
                name: "ATK1",
                src: "Attack1.png",
                dame: 5,
                slowEnemy: 0,
                attackSpeed: 0.1,
                attackRange: GAME_WIDTH * 0.2,
            },
            {
                name: "ATK2",
                src: "Attack2.png",
                dame: 1000,
                slowEnemy: 0,
                attackSpeed: 0.1,
                attackRange: GAME_WIDTH * 0.1,
            },
        ],
    },
};

export const ENEMY = {
    wiard: {
        health: 800,
        dame: 1,
        speed: Math.random() * 0.8 + 0.2,
    },
    bolbMinion: {
        health: 1500,
        dame: 2,
        speed: Math.random() * 0.5 + 0.1,
    },
};
