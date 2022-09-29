let contactForm = document.querySelector(".contact-form");
let contactAllInput = document.querySelector(".contact-input");
let contactNameInput = document.querySelector(".contact-name-input");
let contactRelationshipInput = document.querySelector(
  ".contact-relationship-input"
);
let contactTelInput = document.querySelector(".contact-tel-input");
let contactSuccessBox = document.querySelector(".success-box");
let contactEmptyBox = document.querySelector(".empty-box");
let contactSendBtn = document.querySelector(".contact-send-btn");
let contactCanceldBtn = document.querySelector(".contact-delete-btn");
let contactItemCounter = document.querySelector(".contact-item-counter");
let contactResetdBtn = document.querySelector(".contact-reset-btn");
let contactResultList = document.querySelector(".contact-result-list");

let contactList = [];

let arrayLocal = JSON.parse(window.localStorage.getItem("userName")) || [];

contactItemCounter.textContent = ` Your item's count ${contactList.length}`;

// ! Form submit event
contactForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  let contactNameInputValue = contactNameInput.value;
  let contactRelationshipInputValue = contactRelationshipInput.value;
  let contactTelInputValue = contactTelInput.value;

  const contactObject = {
    id: contactList.length,
    name: contactNameInputValue,
    relationship: contactRelationshipInputValue,
    number: contactTelInputValue,
  };

  // ! Check for empty input for tel tye
  //   if (typeof contactTelInput.value === "number") {
  //     contactList.push(contactObject);
  //   } else {
  //     contactList.push();
  //   }

  // ! Check for empty Input

  let objectNumber = contactList.findIndex(
    (numberLists) => numberLists.number == contactObject.number
  );

  if (
    contactNameInputValue !== "" &&
    contactRelationshipInputValue !== "" &&
    contactTelInputValue !== "" &&
    objectNumber
  ) {
    contactList.push(contactObject);

    // ! This is setTimeOut code for success box
    contactSuccessBox.classList.add("success-box--on");
    setTimeout(() => {
      contactSuccessBox.classList.remove("success-box--on");
    }, 2000);

    contactItemCounter.textContent = ` Your item's count ${contactList.length}`;

    // ! Clean all input after submitting
    contactNameInput.value = "";
    contactRelationshipInput.value = "";
    contactTelInput.value = "+";
  } else {
    contactList.push();

    // ! This is setTimeOut code for empty box
    contactSuccessBox.classList.remove("success-box--on");
    contactEmptyBox.classList.add("empty-box--on");
    setTimeout(() => {
      contactEmptyBox.classList.remove("empty-box--on");
    }, 3000);
  }

  addList(arrayLocal);
  window.localStorage.setItem("userName", JSON.stringify(arrayLocal));

  addList();
});

// ! Function to add element from JavaScript
function addList() {
  contactResultList.innerHTML = "";
  contactList.forEach((item) => {
    let contactItem = document.createElement("li");
    let contactIdText = document.createElement("p");
    let contactIdTextSpan = document.createElement("span");
    let contactNameText = document.createElement("p");
    let contactNameTextSpan = document.createElement("span");
    let contactRelationText = document.createElement("p");
    let contactRelationTextSpan = document.createElement("span");
    let contactNumberText = document.createElement("p");
    let contactNumberTextSpan = document.createElement("a");
    let contactDeleteItemBtn = document.createElement("button");
    contactNumberTextSpan.href = `tel:${item.number}`;

    // ! Delete one by one
    // contactDeleteItemBtn.dataset.deleteItemBtnID = item.id;
    // contactDeleteItemBtn.addEventListener("click", (evt) => {
    //   let deleteBtnID = evt.target.dataset.deleteItemBtnID;
    //   let index = contactList.findIndex((item) => {
    //     return item.id == deleteBtnID;
    //   });
    //   let deletedArray = contactList.splice(index, 1);
    //   addList();
    // });

    contactItem.classList.add("contact-result-item");

    // ! Contact Title Names
    contactIdText.textContent = `Contact ID: `;
    contactIdTextSpan.textContent = ` ${item.id + 1}`;
    contactIdText.classList.add("contact-result-main-text");
    contactNameText.textContent = `Name:`;
    contactNameTextSpan.textContent = ` ${item.name}`;
    contactNameText.classList.add("contact-result-main-text");
    contactRelationText.textContent = `Relationship:`;
    contactRelationTextSpan.textContent = ` ${item.relationship}`;
    contactRelationText.classList.add("contact-result-main-text");
    contactNumberText.textContent = `Number:`;
    contactNumberTextSpan.textContent = ` ${item.number}`;
    contactNumberText.classList.add("contact-result-main-text");

    // ! Contact Append Child
    contactResultList.appendChild(contactItem);

    contactItem.appendChild(contactIdText);
    contactIdText.appendChild(contactIdTextSpan);
    contactIdTextSpan.classList.add("contact-result-main-text-span");

    contactItem.appendChild(contactNameText);
    contactNameText.appendChild(contactNameTextSpan);
    contactNameTextSpan.classList.add("contact-result-main-text-span");

    contactItem.appendChild(contactRelationText);
    contactRelationText.appendChild(contactRelationTextSpan);
    contactRelationTextSpan.classList.add("contact-result-main-text-span");

    contactItem.appendChild(contactNumberText);
    contactNumberText.appendChild(contactNumberTextSpan);
    contactNumberTextSpan.classList.add("contact-result-main-text-span");

    contactItem.appendChild(contactDeleteItemBtn);
    contactDeleteItemBtn.setAttribute("type", "button");
    contactDeleteItemBtn.classList.add("contact-delete-item-btn");
    contactDeleteItemBtn.textContent = `Delete`;

    contactDeleteItemBtn.addEventListener("click", () => {
      contactItem.classList.add("d-none");
      contactItemCounter.textContent = ` Your item's count ${--contactList.length}`;
    });

    contactResetdBtn.addEventListener("click", (e) => {
      contactList = [];
      contactResultList.innerHTML = "";
      contactItemCounter.textContent = ` Your item's count ${contactList.length}`;
    });
  });
}
