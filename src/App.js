import { useState } from "react"
import "./App.css"

import contacts from "./contacts.json"

function App() {
    const fiveContacts = contacts.slice(0, 5)

    const [contactList, setContactList] = useState(fiveContacts)

    const addRandomContact = () => {
        const newArr = contacts.slice()
        newArr.splice(0, 5)

        const randomCelebrity =
            newArr[Math.floor(Math.random() * newArr.length)]

        let inList = false

        for (let contact of contactList) {
            if (randomCelebrity.id === contact.id) {
                inList = true
            }
        }

        !inList && setContactList(contactList => [...contactList, randomCelebrity])
    }

    const [sortedName, setSortedName] = useState(false)
    const [sortedPopularity, setSortedPopularity] = useState(false)

    sortedName && contactList.sort((a, b) => a.name.localeCompare(b.name))
    sortedPopularity && contactList.sort((a, b) => b.popularity - a.popularity)

    const sortByName = () => {
        setSortedName(true)
        setSortedPopularity(false)
    }

    const sortByPopularity = () => {
        setSortedPopularity(true)
        setSortedName(false)
    }

    const removeContact = id => {
        const newContacts = [...contactList]
        const removedContact = newContacts.filter(contact => contact.id !== id)

        setContactList([...removedContact])
    }

    return (
        <div className="App">
            <h1>IronContacts</h1>

            <div className="ButtonsContainer">
                <button onClick={addRandomContact}>Add random contact</button>
                <button onClick={sortByName}>Sort by name</button>
                <button onClick={sortByPopularity}>Sort by popularity</button>
            </div>

            <table>
                <thead>
                    <tr>
                        <td>Picture</td>
                        <td>Name</td>
                        <td>Popularity</td>
                        <td>Won Oscar</td>
                        <td>Won Emmy</td>
                        <td>Remove contact</td>
                    </tr>
                </thead>

                <tbody>
                    {contactList.map(item => (
                        <tr key={item.id}>
                            <td>
                                <img src={item.pictureUrl} alt="" />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.popularity}</td>
                            <td>{item.wonOscar && "🏆"}</td>
                            <td>{item.wonEmmy && "🌟"}</td>
                            <td>
                                <button onClick={() => removeContact(item.id)}>
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default App
