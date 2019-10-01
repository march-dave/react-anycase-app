// import axios from 'axios';

// const apiHost = "https://gist.githubusercontent.com/dsandin/7b7cd2b834abd8c10908803cac5d1dd3/raw/9a8c0270e0f7a778409b2996419bacdbb06edc87/users_page1"

// const ContactActionCreator = {
//     changeName(pages) {
//         return { type: "SET_PAGES", pages }
//     },

//     asyncSearchContact() {
//         return (dispatch, getState) => {
//             // let { name } = getState();
//             // dispatch(this.searchContactRequest(name));
//             axios.get(apiHost)
//                 .then((response) => {
//                     dispatch(this.changeName(response.data));
//                 })
//                 .catch((error) => {
//                     // dispatch(this.searchContactFail());
//                 })

//         }
//     }
// }

// export default ContactActionCreator;