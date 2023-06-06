export const preset = '@shelf/jest-mongodb';
export const setupFiles = ['dotenv/config'];
export const displayName = {
    name: 'peoplesuite',
    color: 'inverse',
};

export const verbose = true;
export const collectCoverage = true;
export const rootDir = '../__tests__';
export const coverageDirectory = '../__coverage__';
export const moduleDirectories = ['node_modules', 'middleware'];
export const clearMocks = true;