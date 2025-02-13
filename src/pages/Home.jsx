import {Heading, Description, SearchForm} from '../components'

export default function Home() {
  return (
    <section className='home flex flex-1 justify-center items-center'>
      <div className='text-center flex items-center flex-col gap-5 mb-36 px-4'>
        <Heading title={'Search'} />
        <Description text={'Search high-resolution images from Unsplash'} size={'lg'}/>
        <SearchForm />
      </div>
    </section>
  )
}
