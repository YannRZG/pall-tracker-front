<template>
  <div>
    <h2>Connections</h2>
    <table>
      <thead>
        <tr>
          <th>Shipper</th>
          <th>Carrier</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in connectionsStore.connections" :key="c.id">
          <td>{{ c.shipper.name }}</td>
          <td>{{ c.carrier.name }}</td>
          <td>{{ c.status }}</td>
          <td>
            <button @click="acceptConnection(c.id)">Accepter</button>
            <button @click="rejectConnection(c.id)">Refuser</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useUserConnectionsStore } from '../stores/userConnections'

export default {
  setup() {
    const connectionsStore = useUserConnectionsStore()
    connectionsStore.fetchConnections()

    const acceptConnection = async (id) => {
      await connectionsStore.updateConnection(id, { status: 'accepted' })
    }

    const rejectConnection = async (id) => {
      await connectionsStore.updateConnection(id, { status: 'rejected' })
    }

    return { connectionsStore, acceptConnection, rejectConnection }
  }
}
</script>
