declare module 'cstimer_module';
export function getScrambleTypes(): string[];
export function getScramble(type: string, length: number=0, ...args: any[]): string;
export function setSeed(string): void;
export function setGlobal(key: string, value: any): void;
export function getImage(scramble: string, type: string="333"): string;
