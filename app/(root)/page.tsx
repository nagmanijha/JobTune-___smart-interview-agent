
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { dummyInterviews } from '@/constants'
import  InterviewCard from "@/components/InterviewCard"
const Page = () => {
  return (
    <>
    <section className="card-cta">
    <div className="flex flex-col gap-6 max-w-lg">
      <h2>
        Get ready to ace your next interview with AI - powered prep!
      </h2>
      <p className="text-lg">
        Practice with real interview questions, get personalized feedback, and track your progress.
      </p>

      <Button asChild className='btn-primary max-sm: w-full'>
        <Link href='/interview'>Start an interview</Link>
      </Button>
    </div>
    <Image src="/robot.png" alt="Interview Illustration" width={500} height={500}
    className='max-sm:hidden' />
    </section>
    <section className='flex flex-col gap-6 max-w-lg mx-auto mt-8'>
      <h2>   Your Interviews </h2>
      <div className="interviews-section">
       {dummyInterviews.map((interview) => (
         <InterviewCard {...interview} key={interview.id} />
      ))}
      </div>
    </section>
    <section className='flex flex-col gap-6 max-w-lg mx-auto mt-8'>
      <h2> Take an Interview</h2>
      <div className="interviews-section">
         {dummyInterviews.map((interview) => (
         <InterviewCard {...interview} key={interview.id} />
      ))}
        {/* <p>You haven`&apos;t scheduled any interviews yet.</p> */}
      </div>
    </section>

  </>
  )
}

export default Page