let error404 = {
    render : async () => {
        let view =  /*html*/`
            <section class="section">
                <h1> 404 Error </h1>
            </section>
        `
        return view
    },
    init: async() => {
    },
    after_render: async () => {
    }
}
export default error404;