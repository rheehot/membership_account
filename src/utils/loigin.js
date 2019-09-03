import users from '../assets/userData.js'

const getData = async (user) => {
    const options = {
       method: 'GET',
       headers: {
           'Content-Type': 'application/json'
       }
   };
   try {
        //const response = await fetch(`https:server` + id, options)
        // const json = await response.json();
        // return json
        let pass = false;
        const response = users;
        response.forEach(data=>{
            if(data.id === user.id && data.pw === user.pw){ 
                pass = true
            };
        });
        return pass;

   } catch (err) {
       console.log('fail to get data', err)
   }
}
export default getData;