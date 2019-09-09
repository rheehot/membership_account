const Header = {
  render: async () => {
    const view = /* html */ `
             <div class="header">
                <h1><a href = '/'>TODO</a></h1>
                <div class="info"></div>
            </div>
        `;
    return view;
  },
  afterRender: async () => {},
};

export default Header;
