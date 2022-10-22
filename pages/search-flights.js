import SearchFlights from '../src/components/inputs/searchFlights';
import styles from '../styles/Home.module.css';

export default function SearchFlight() {
  return (
    <div className={styles.container}>
      <main className={`${styles.main} justify-start lg:pt-32 `}>
        <SearchFlights />
        <div className='w-full bg-slate-400 bg-opacity-50 flex justify-center  my-10'>
          <div className='show-flights flex flex-col w-full max-w-7xl py-10 px-4 lg:px-0'>
            <div className='w-full flex justify-between items-center'>
              <section className='flex flex-col items-start'>
                <span className='text-base lg:text-lg font-bold'>
                  Berlin (BER) <strong className='text-xl'>→</strong> London (LHR){' '}
                </span>
                <span className='text-sm lg:text-sm'>Sun. Mar 30</span>
              </section>
              <span className='text-sm lg:text-sm'>Showing 118 of 118 flights</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
