// shadcn/ui
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '../ui/button'
import Link from 'next/link'

type HoverParams = {
  orgUserName: string
  orgFirstName: string
  orgLastName: string
  orgPhoto: string
  orgEmail: string
}

const HoverOrganizer = ({
  orgUserName,
  orgFirstName,
  orgLastName,
  orgPhoto,
  orgEmail,
}: HoverParams) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <p className="p-medium-16 flex-center">
          by{' '}
          <Button variant="link" className="px-2">
            <span className="p-bold-16 text-primary-500">
              {orgFirstName} {orgLastName}
            </span>
          </Button>
        </p>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src={orgPhoto} />
            <AvatarFallback>
              {orgFirstName[0]} {orgLastName[0]}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 truncate">
            <h3 className="text-sm font-semibold">
              @
              <span className="p-medium-14 text-primary-500">
                {orgUserName}
              </span>
            </h3>
            <h4 className="text-sm font-semibold">
              <span className="p-medium-14 text-primary-500">{orgEmail}</span>
            </h4>
            <p className="text-sm mt-2">
              • Find me on &rarr;
              <br />
              <Link
                target="_blank"
                href={'https://www.linkedin.com/in/ememvii/'}
                className="p-semibold-14 text-primary-500"
              >
                Linked in
              </Link>
              <br />
              <Link
                target="_blank"
                href={'https://github.com/ememVII'}
                className="p-semibold-14 text-black"
              >
                Github
              </Link>
            </p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}

export default HoverOrganizer
