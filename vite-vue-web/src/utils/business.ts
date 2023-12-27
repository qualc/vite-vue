export const withInstall = (component: any) => {
  component.install = (app: any) => {
    app.component(component.name, component);
  };
  return component;
};
