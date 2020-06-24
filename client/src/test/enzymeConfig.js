import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

const config = configure({ adapter: new Adapter() });

export default config;
