//import  Enzyme from 'enzyme';
import Enzyme, { configure, shallow, mount, render } from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

// Configure Enzyme with React 16 adapter
configure({ adapter: new Adapter() });
export { shallow, mount, render };
export default Enzyme;

// If you're using the fetch API
//import fetch from 'node-fetch';
//global.fetch = fetch;