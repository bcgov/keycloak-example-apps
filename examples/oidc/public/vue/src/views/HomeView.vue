<script setup>
import { logout } from '../services/keycloak'
import { ref, inject } from 'vue'
import moment from 'moment';

const keycloak = inject('keycloak')
const message = ref('')

const formatDate = (unixTime) => {
  return moment(unixTime * 1000).format('dddd, MMMM Do, YYYY h:mm A')
}

const fetchRestictedContent = () => {
  message.value = 'Request in flight...'
  // Defaulting to 8080 for demo purposes
  const serverURI = import.meta.env.VITE_SERVER_URI ?? 'http://localhost:8080' 
  fetch(`${serverURI}/restricted`, {
    headers: {
      Authorization: `Bearer ${keycloak.token}`,
    },
  })
    .then((res) => res.text())
    .then((text) => (message.value = text))
    .catch(
      () =>
        (message.value =
          `Fetch failed. Ensure the rest API is running on ${serverURI}.`)
    )
}
</script>
<template>
  <main>
    <section>
      <h2>Token Details</h2>
      <p>{{ `Id token expires at ` + formatDate(keycloak?.idTokenParsed.exp) }}</p>
      <p>{{ `Access token expires at ` + formatDate(keycloak?.tokenParsed.exp) }}</p>
      <p>
        {{ `Refresh token expires at ` + formatDate(keycloak?.refreshTokenParsed.exp) }}
      </p>
      <button @click="logout">logout</button>
    </section>

    <section>
      <h2>Test Rest API</h2>
      <p>In order to test sending a token to a backing rest api, you need to also be running one of the <a href="https://github.com/bcgov/keycloak-example-apps/tree/dev/examples/oidc/public/rest-api" target="_blank">rest API examples</a>.</p>
      <button @click="fetchRestictedContent">Fetch Restricted Content</button>
      <p v-if="message">{{ message }}</p>
    </section>

  </main>
</template>
