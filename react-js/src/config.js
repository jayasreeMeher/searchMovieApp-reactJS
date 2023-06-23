/**
 * @author Jayasree Meher
 * @email jayasree.meher31@gmail.com
 * @create date 2023-06-09 19:36:01
 * @desc React js application
 */

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001",
});

export default API;
