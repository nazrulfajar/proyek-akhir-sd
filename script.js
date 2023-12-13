// Node class for storing image data
class Node {
  constructor(data, next, prev) {
    this.data = data;
    this.next = next || null;
    this.prev = prev || null;
  }
}

// Head of the circular doubly linked list
let head = null;

// Function to add an image to the list
function addImage() {
  const imageUrl = document.getElementById("image-url").value;

  // Create a new node with the image URL
  const newNode = new Node(imageUrl);

  // Check if list is empty
  if (!head) {
    // Set head and tail to the new node
    head = newNode;
    head.next = head;
    head.prev = head;
  } else {
    // Get the last node
    const lastNode = head.prev;

    // Connect the last node to the new node
    lastNode.next = newNode;
    newNode.prev = lastNode;

    // Connect the new node to the head
    newNode.next = head;
    head.prev = newNode;
  }

  // Clear the input field
  document.getElementById("image-url").value = "";

  // Display the added image
  displayListImages();
  showSingleImage();
}

function deleteImage() {
  // Check if the list is empty
  if (!head) {
    return;
  }

  let current = head;

  // Remove the node from the list
  if (current === head) {
    // If deleting the only node, set head to null
    if (head.next === head) {
      head = null;
    } else {
      // If deleting head, update head
      head = current.next;
    }
  }
    const prevNode = current.prev;
    const nextNode = current.next;
    prevNode.next = nextNode;
    nextNode.prev = prevNode;

  // Update single image if it's the deleted image

  showSingleImage();


  // Remove the deleted node
  current = null;

  // Display the remaining images
  displayListImages();
}

// Function to display all images in the list
function displayListImages() {
  const imageContainer = document.getElementById("image-container");
  imageContainer.innerHTML = "";

  // Traverse the list and display each image
  let current = head;
  do {
    const imageElement = document.createElement("img");
    imageElement.src = current.data;
    imageContainer.appendChild(imageElement);

    current = current.next;
  } while (current !== head);
}

function showSingleImage() {
  const singleImageContainer = document.getElementById("single-image-container");
  singleImageContainer.innerHTML = "";

  let current = head;
  if (current) {
    const imageElement = document.createElement("img");
    imageElement.src = current.data;
    singleImageContainer.appendChild(imageElement);
  }
}

function nextImage() {
  // Get the current image
  const current = head;

  // If the current image is the last image
  if (current.next === head) {
    return;
  }

  // Set the current image to the next image
  head = current.next;

  // Display the current image
  showSingleImage();
}

function previousImage() {
  // Get the current image
  const current = head;

  // If the current image is the first image
  if (current.prev === head) {
    return;
  }

  // Set the current image to the previous image
  head = current.prev;

  // Display the current image
  showSingleImage();
}