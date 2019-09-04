const Header = {
  render: async () => {
    const view = /* html */ `
             <div class="header">
                <h1>TODO</h1>
                <div class="info"></div>
            </div>
        `;
    return view;
  },
  after_render: async () => {},
};

export default Header;
