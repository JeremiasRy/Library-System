import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

global.localStorage = {
    length: 0, 
    clear: () => {}, 
    getItem(key) {
        return null;
    },
    key(index) {
        return null;
    },
    removeItem(key) {},
    setItem(key, value) {
        
    },
 };