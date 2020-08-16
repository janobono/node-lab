export const INFO_MESSAGE = 'INFO_MESSAGE';

export default () => ({
    infoMessage: process.env.INFO_MESSAGE || 'Node lab application backend is running.'
});


