import { v4 as uuidv4 } from "uuid";
export const getuuid = () => {
    let uuid = '';
  
    try {
      // 先看看本地是否有uuid
      let uuid_token = localStorage.getItem("UUIDTOKEN");
      if (!uuid_token) {
        // 生成UUID
        uuid = uuidv4();
        // 存储到本地存储中
        localStorage.setItem("UUIDTOKEN", uuid);
      } else {
        uuid = uuid_token;
      }
    } catch (error) {
      console.error("Failed to get UUID from local storage", error);
    }
  
    if (!uuid) {
      uuid = uuidv4(); // 生成新的UUID
    }
  
    return uuid;
  };
