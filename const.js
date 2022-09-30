export const GAME_WIDTH = 1200;
export const GAME_HEIGHT = 600;

export const DEFENDER = {
    huntress: {
        dame: 5,
        slowEnemy: 0.01,
        health: 100,
        attackRange: GAME_WIDTH * 0.5,
        attackSpeed: 0.2,
    },
    worm: {
        dame: 50,
        slowEnemy: 0.009,
        health: 200,
        attackRange: GAME_WIDTH * 0.4,
        attackSpeed: 0.15,
    },
    evilWizard: {
        dame: 100,
        slowEnemy: 0,
        health: 300,
        attackRange: GAME_WIDTH * 0.3,
        attackSpeed: 0.1,
    },
    wizardPack: {
        dame: 150,
        slowEnemy: 0,
        health: 500,
        attackRange: GAME_WIDTH * 0.2,
        attackSpeed: 0.1,
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
