export function bindMethods<T extends object>(instance: T): void {
  const prototype = Object.getPrototypeOf(instance);
  const propertyNames = Object.getOwnPropertyNames(prototype);

  for (const propertyName of propertyNames) {
    const descriptor = Object.getOwnPropertyDescriptor(prototype, propertyName);
    const propertyValue = instance[propertyName as keyof T];

    if (
      typeof propertyValue === "function"
      && propertyName !== "constructor"
      && descriptor
      && !descriptor.get
      && !descriptor.set
    ) {
      instance[propertyName as keyof T] = propertyValue.bind(instance);
    }
  }
}

/**
 * 判断对象是否为null、undefined、{}以及对象属性值都为空，该方法只判断一层，不递归判断，字符串会判断是否为空串
 * 对象的属性只要有一个不为空，就返回false，说明对象不为空
 */
export function objectIsEmpty(params: object): boolean {
  if (params === null || params === undefined) {
    return true;
  }
  if (Object.keys(params).length === 0) {
    return true;
  }
  const entries = Object.entries(params);
  for (const [, value] of entries) {
    if (value === null || value === undefined) {
      continue;
    }
    if (value !== "") {
      return false;
    }
  }
  return true;
}
