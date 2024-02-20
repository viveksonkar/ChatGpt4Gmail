import { cmpTone } from "../controls/tone";

export const sideBar = () => {
  // Create a container element for the sidebar
  var sidebarContainer = document.createElement('div');
  sidebarContainer.style.width = '100%'; // Adjust width as needed
  sidebarContainer.style.backgroundColor = '#f3f3f3'; // Customize background color
  //const data = StorageService.get('THREAD_ID');
  // Add your custom sidebar content
  sidebarContainer.innerHTML = `
    <div style="padding: 10px;">
      <h3>My Sidebar</h3>
      <p>This is my custom sidebar content</p>
      ${cmpTone()}
    </div>
  `;
  return {
    title: 'ChatGpt4Gmail',
    appName: 'ChatGpt4Gmail',
    hideTitleBar: false,
    primaryColor: 'black',
    iconUrl: "https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365",
    el: sidebarContainer
  };
}