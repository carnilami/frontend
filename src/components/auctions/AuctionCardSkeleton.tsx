import { Card, CardBody, Skeleton, SkeletonText } from "@chakra-ui/react";

const AuctionCardSkeleton = () => {
  return (
    <Card overflow="hidden" variant="unstyled">
      <CardBody>
        <Skeleton height={220} borderRadius={5} />
        <Skeleton height={5} mt={3} />
        <SkeletonText mt={2} noOfLines={5} spacing={1} />
      </CardBody>
    </Card>
  );
};

export default AuctionCardSkeleton;
