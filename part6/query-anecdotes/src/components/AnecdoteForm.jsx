import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnecdote } from '../requests'
import { useNotifDispatch } from '../context/NotifHooks'

const AnecdoteForm = () => {
  const notifDispatch = useNotifDispatch()
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
    onError: (error) => {
      console.log('error:', error)
      notifDispatch({ type: 'SET', payload: `${error.response.data.error}` })
      setTimeout(() => {
        notifDispatch({ type: 'CLEAR', payload: '' })
      }, 5000)
    },
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notifDispatch({ type: 'SET', payload: `CREATED '${content}'` })
    setTimeout(() => {
      notifDispatch({ type: 'CLEAR', payload: '' })
    }, 5000)
  }

  return (
    <div style={{ marginBottom: '10px' }}>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
