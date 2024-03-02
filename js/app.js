const usersList = document.querySelector(".usersList");
const updateButton = document.getElementById("btnUpdate");
const sortEmailButton = document.getElementById("sortEmail");
const sortedByEmailList = document.querySelector(".sortedByEmailList");
const filterInput = document.getElementById("filterLetter");
const filterButton = document.getElementById("filterButton");
const filteredUsersList = document.querySelector(".filteredUsers");
const url = "https://jsonplaceholder.typicode.com/users";

let allUsers = [];
const createUserElement = (user) => {
    const userDiv = document.createElement("div");
    userDiv.classList.add("userInfo");
    userDiv.innerHTML = `<div>name: ${user.name}</div>
                         <div>email: ${user.email}</div>
                         <div>phone: ${user.phone}</div>`;
    return userDiv;
};

const displayUsers = (users, container) => {
    container.innerHTML = '';
    users.forEach(user => {
        const userElement = createUserElement(user);
        container.appendChild(userElement);
    });
};
const createUserElementByEmail = (user) => {
    const userDiv = document.createElement("div");
    userDiv.classList.add("userEmail");
    userDiv.innerHTML = `<div>${user.email}</div>`;
    return userDiv;
};

const displayUsersEmail = (users, container) => {
    container.innerHTML = '';
    users.forEach(user => {
        const userElement = createUserElementByEmail(user);
        container.appendChild(userElement);
    });
};

const getUsers = async () => {
    try {
        const response = await fetch(url);
        const dataUsers = await response.json();
        allUsers = dataUsers;
        displayUsers(dataUsers, usersList);
    } catch (error) {
        console.error("Не удалось получить пользователей:", error);
    }
};


const sortUsersByEmail = async (sortOrder = '') => {
    try {
        allUsers.sort((a, b) => a.email.localeCompare(b.email));
        displayUsersEmail(allUsers, sortedByEmailList);
    } catch (error) {
        console.error("Не удалось отсортировать пользователей:", error);
    }
};

const displayFilteredUsers = (letter) => {
    const filteredUsers = allUsers.filter(user => user.name.toLowerCase().startsWith(letter.toLowerCase()));

    if (filteredUsers.length === 0) {
        filteredUsersList.innerHTML = `<div>Не найдено пользователей, начинающихся с буквы "${letter}".</div>`;
    } else {
        displayUsers(filteredUsers, filteredUsersList);
    }
};

filterButton.addEventListener("click", () => {
    const letter = filterInput.value.trim();
    if (letter) {
        displayFilteredUsers(letter);
    } else {
        alert("Пожалуйста, введите букву для фильтрации");
    }
});

getUsers().then(users => allUsers = users);
updateButton.addEventListener("click", getUsers);
sortEmailButton.addEventListener("click", () => sortUsersByEmail('email'));
getUsers()