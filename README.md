This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


## yarn test --coverage
yarn test --env=jsdom --coverage


## free images url
https://pngtree.com/so/hamburger

<!-- import React from "react";
import { mount, shallow } from "enzyme";
import Basic from "./Basic";
import configureMockStore from "redux-mock-store";
import configureStore from "./configureStore";

import { Provider } from "react-redux";

import action from "./Action";
import reducer from "./Reducer";

const setup = () => {
  let mockStore = configureMockStore();

  // 데이터들을 받아올 가짜 스토어 만들기
  // let store = mockStore({
  //   username: "dave"
  // });
  let store = mockStore({});

  store.dispatch(action("dave"));

  let wrapper = shallow(
    <Provider store={store}>
      <Basic />
    </Provider>
  );

  // const wrapper = mount(<Basic />);
  console.log(wrapper.debug());
};

setup();

describe("action testing", () => {
  test("should create an action to add a todo", () => {
    const user = "dave";
    const exceptedAction = {
      type: "SET_USER",
      user
    };
    expect(action(user)).toEqual(exceptedAction);
  });
});

describe("reducer testing", () => {
  let state = reducer(undefined, {});
  test("should return initialState", () => {
    console.log(state);
    expect(state).toHaveProperty("username", "dave");
  });

  test("should state change", () => {
    state = {
      ...state,
      username: "jane"
    };

    state = reducer(state, "SET_USER");
    console.log(state);
    expect(state).toHaveProperty("username", "jane");
  });
});

let mockStore = configureMockStore();

// 데이터들을 받아올 가짜 스토어 만들기
// let store = mockStore({
//   username: "dave"
// });
let store = mockStore({});
// username: "dave"

describe("Store renders properly", () => {
  <!-- let component = null;
  let buttons = null;

  // Real Store
  // let store = configureStore();

  it("renders properly", () => {
    store.dispatch(action("dave"));

    let component = shallow(
      <Provider store={store}>
        <Basic />
      </Provider>
    );

    // console.log(store.getState());
    console.log(store.getActions());

    expect(store.getActions()[0]).toEqual({ type: "SET_USER", user: "dave" });
  });

  describe("describe debug", () => {
    test("fdsjklsfdkjlfds", () => {
      let wrap = shallow(<Basic />);
      console.log(wrap.find("input").debug());
      console.log("sdjflsdjfslj");
    });
  });

  it("dispatches action", () => {
    const mockedEvent = {
      target: {
        value: "world"
      }
    };
    // component.find('input').simulate('change', mockedEvent);
    // expect(store.getState().names.input).toBe('world');
  });

  // it('dispatches INSERT action', () => {
  //   component.find('form').simulate('submit');
  //   expect(store.getState().names.names).toEqual(['world']);
  // });

  //   it("matches snapshot", () => {
  //     expect(component).toMatchSnapshot();
  //   });
}); -->


<!-- mapDispatchToProps Redux Action -->
<!-- // option 1
const mapDispatchToProps = (dispatch) => ({
  action: () => dispatch(action())
})


// option 2
const mapDispatchToProps = (dispatch) => ({
  action: bindActionCreators(action, dispatch)
})


// option 3
const mapDispatchToProps = {
  action: action
} -->


## git stash test
# stash 2


this.setState(prevState => ({
      currentPage: prevState.currentPage - 1,
      user_id: this.props.user.id,
      id: prevState.currentExercise.id,
      answers: prevState.answers,
      fullSentence: decodeString(prevState.fullSentence),
    }));

    if (this.pages[this.state.currentPage] === 'beforeYouStart') {
      this.setState(prevState => ({
        currentPage: prevState.currentPage + 1,
        canProceed: !!prevState.currentExercise.exercise_responses
      }));

      this.setState(prevState => ({
        selectedValue: {
          ...prevState.selectedValue,
          [questionIndex]: null
        },
      }));

      this.setState({ currentQuestion: index - 1 }, () => {
        this.setState(prevState => ({
          currentPage,
          isQuestions: false,
          isQuestionForm: false,
          isQuestionEdit: true,
          finalAnswer: prevState.textFields.map((answer, ind) => (ind === 3 ? `${answer}` : `${answer}\n\n`)).join('')
        }));

        if(e.value) {
          this.setState(prevState => ({
            selectedValue: e,
            updateAnyAnswered: (prevState.updateAnyAnswered !== true) ? true:  prevState.updateAnyAnswered
          }), () =>  {this.processResponse(questionIndex)} );
        }

        if (this.state.selectedValue[questionIndex].value !== e.value) {
          this.setState({
            selectedValue: e,
            updateAnyAnswered: true
          }, () => {
            this.processResponse(questionIndex);
          });
        }

        if (this.state.updateAnyAnswered === false) {
          this.setState({ updateAnyAnswered: true })
        }

  state = {
    name: '',
    phone: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  <input
          placeholder="first name"
          value={this.state.name}
          onChange={this.handleChange}
          name="name" 
          />


# Rename local branch
git branch -m new-name

# React.memo 사용법 3 가지 

방법 1) function
const Count = React.memo(function Count(props) {
  return <div>{props.count}</div>;
});

방법 2) arrow function
const Count = React.memo((props) => {
  return <div>{props.count}</div>;
};

방법 3) wrapping
const Count = props => <div>{props.count}</div>;
const WrappedCount = React.memo(Count);

방법 4)  TypeScript
const Count = React.memo(( {이곳에 props 지정 }:이곳에 type 지정 ) => {
  return <div>{props.count}</div>;
};

const Count = React.memo(( { id, title, name 등등 }: props ) => {
  return <div>{props.count}</div>;
};

const Count = React.memo(( props: IUser ) ) => {
  return <div>{props.count}</div>;
};

# javascript
var p1 = 1;
var p2 = 1;

console.log(p1, p2, p1===p2)

# immutability
var obj = { name: "john doe" , score: [1,2]}
Object.freeze(obj);
obj.name = "jane doe"; // can't change
obj.score.push[3];    // huk!! because of reference
Ojbect.freeze(obj.score) // have to use freeze reference level
obj.score.push[3];    // can't change


# git local user 사용법
git config --list 로 현재 사용자 확인

git config --local user.name '사용자 id' <-- 안써도 된다 귀찮으면, 아래 이메일만 정확 하면 유저 이름 쯤이야~!!
git config --local user.email 'abc@abc.com'

# react 에서 
process.env.xxx 는 어떻게 쓰는지 알아 봐야 한다. 