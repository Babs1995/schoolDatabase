import { Buffer } from "buffer";
// import { CSSCourses } from "data";

export default class Data {
  api(
    path,
    method = "GET",
    body = null,
    requiresAuth = false,
    credentials = null
  ) {
    const url = "http://localhost:5000/api" + path;

    const options = {
      method,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    };
    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = Buffer.from(
        `${credentials.emailAddress}:${credentials.password}`
      ).toString("base64");
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, "GET", null, true, {
      emailAddress,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async createUser(user) {
    const response = await this.api("/users", "POST", user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async getCourses() {
    const response = await this.api(`/courses`, "GET");
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, "GET", null, false);
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async createCourse(course, emailAddress, password) {
    // const { emailAddress, password } = credentials;
    const response = await this.api("/courses/create", "POST", course, true, {
      emailAddress,
      password,
    });
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

  async updatedCourse(id, course, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, "PUT", course, true, {emailAddress, password});
    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async deleteACourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, "DELETE", true, {
      emailAddress,
      password,
    });

    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
    } else {
      throw new Error();
    }
  }
}
