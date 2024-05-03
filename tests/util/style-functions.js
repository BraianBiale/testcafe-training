export const checkBorderRadiusStyles = async (t, element, expectedRadius) => {
  await t
    .expect(element.getStyleProperty("border-top-right-radius"))
    .eql(expectedRadius)
    .expect(element.getStyleProperty("border-top-left-radius"))
    .eql(expectedRadius)
    .expect(element.getStyleProperty("border-bottom-right-radius"))
    .eql(expectedRadius)
    .expect(element.getStyleProperty("border-bottom-left-radius"))
    .eql(expectedRadius);
};
