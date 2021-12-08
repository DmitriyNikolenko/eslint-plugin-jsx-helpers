const RuleTester = require("eslint").RuleTester;

const rule = require("./jsxEnforceAttribute");

const tester = new RuleTester({
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});

const dataTestId = "someTestId";
const options = [
  {
    attributeName: "data-test-id",
    elementMatchers: ["Text", "Touchable*", "div", "Button"],
  },
];

tester.run("jsx-enforce-attribute", rule, {
  valid: [
    {
      code: "<div data-test-id={dataTestId}>Hello</div>",
      options,
    },
    {
      code: "<span>something</span>",
      options,
    },
    {
      code: "<TestComponent onClick={eventHandler} data-test-id={dataTestId}/>",
      options,
    },
    {
      code: "<TouchableNativeFeedback data-test-id={dataTestId}><View /></TouchableNativeFeedback>",
      options,
    },
    {
      code: "<TouchableNativeFeedback data-test-id={dataTestId}><View /></TouchableNativeFeedback>",
      options,
    },
    { code: "<Text data-test-id={dataTestId}>Hello</Text>", options },
    {
      code: "<Button.Filled data-test-id={dataTestId}>Click me</Button.Filled>",
      options,
    },
  ],
  invalid: [
    {
      code: "<div>Hello</div>",
      errors: [{ messageId: "jsxAttributeIsRequired" }],
      options,
    },
    {
      code: "<TouchableNativeFeedback><View /></TouchableNativeFeedback>",
      errors: [{ messageId: "jsxAttributeIsRequired" }],
      options,
    },
    {
      code: "<Text>some text</Text>",
      errors: [{ messageId: "jsxAttributeIsRequired" }],
      options,
    },
    {
      code: "<Button.Filled>Click me</Button.Filled>",
      errors: [{ messageId: "jsxAttributeIsRequired" }],
      options,
    },
  ],
});
