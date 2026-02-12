/**
 * Type definitions for validatorjs
 *
 * Project: https://github.com/skaterdav85/validatorjs
 * Definitions by:
 *  Karol Janyst <https://github.com/LKay>
 *  Dan Manastireanu <https://github.com/danmana>
 *  Matías Olivera <https://github.com/MatiasOlivera>
 * Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
 */
export interface TypeCheckingRule {
  [attribute: string]: Array<any>;
}

export interface Rules {
  [attribute: string]: string | Array<string | TypeCheckingRule> | Rules;
}

export interface ValidationError {
  data: {
    [key: string]: string;
  };
  message: string;
}

export interface ValidationErrors {
  [field: string]: Array<ValidationError>;
}

export interface ErrorMessages {
  [key: string]: string | ErrorMessages;
}

export interface AttributeNames {
  [attribute: string]: string;
}

export type AttributeFormatter = (attribute: any) => any;

export interface Errors {
  errors: ValidationErrors;
  add(attribute: string, message: string): void;
  get(attribute: string): Array<string>;
  first(attribute: string): string | false;
  all(): ValidationErrors;
  has(attribute: string): boolean;
}

export type RegisterCallback = (value: string | number | boolean, args: string, attribute: string) => boolean;

export type RegisterAsyncCallback = (
  value: string | number | boolean,
  args: string,
  attribute: string,
  passes: (success?: boolean, message?: string) => void
) => void;

interface ValidatorStatic {
  new <A>(data: A, rules: Rules, customMessages?: ErrorMessages): Validator<A>;
  setMessages(lang: string, messages: ErrorMessages): any;
  getMessages(lang: string): ErrorMessages;
  useLang(lang: string): void;
  getDefaultLang(): string;
  setAttributeFormatter(func: AttributeFormatter): void;
  stopOnError(attributes: boolean | Array<string>): void;
  register(name: string, fn: RegisterCallback, message?: string): void;
  registerAsync(name: string, fn: RegisterAsyncCallback, message: string): void;
}

export interface Validator<A> {
  lang: string;
  input: A;
  messages: ErrorMessages;
  errors: Errors;
  errorCount: number;
  hasAsync: boolean;
  rules: Rules;
  numericRules: Array<string>;
  attributeFormatter: AttributeFormatter;
  check(): boolean;
  checkAsync(passes?: Function, fails?: Function): void;
  setAttributeNames(attributes: AttributeNames): void;
  setAttributeFormatter(func: AttributeFormatter): void;
  getRule(name: string): Function;
  stopOnError(passes?: Function): boolean | void;
  passes(passes?: Function): boolean | void;
  fails(fails?: Function): boolean | void;
}

declare const Validator: ValidatorStatic;
export as namespace Validator;
export default Validator;
