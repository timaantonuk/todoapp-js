'use strict';

export const data = {

    generateRandomId(length = 30) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },

    prepareTodo(title) {
        return {
            title,
            id: this.generateRandomId(),
            important: false,
            done: false,
        }
    },

    generateMockedData() {
        return [this.prepareTodo('Walk with a dog'), this.prepareTodo('Date with a girl'), this.prepareTodo('Learn organic Chemistry')];
    },
}