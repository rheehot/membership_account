const Footer = {
    render: async () => {
        let view =  /*html*/`
        <footer class="footer">
            <div class="content has-text-centered">
                <p>
                    Copyright 2019 aeree cho
                </p>
            </div>
        </footer>
        `
        return view
    },
    after_render: async () => { }

}

export default Footer;