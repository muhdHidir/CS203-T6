import { Modal, Button, Group, Text, Stack } from "@mantine/core";
import IncrementChip from "../DataMetric/IncrementChip";

export default function ReviewModal({ opened, handleClose }) {
  return (
    <>
      <Modal
        centered
        size="lg"
        className="font-bold text-xl"
        opened={opened}
        onClose={handleClose}
        title="Post Question Review"
      >
        <Stack>
          <Text className="text-base font-normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Tristique senectus et netus et malesuada fames ac. Viverra nibh cras
            pulvinar mattis nunc sed blandit. Luctus accumsan tortor posuere ac
            ut consequat. Elementum eu facilisis sed odio morbi quis commodo
            odio. Fringilla ut morbi tincidunt augue. Eget nunc scelerisque
            viverra mauris. Posuere sollicitudin aliquam ultrices sagittis orci
            a scelerisque purus. Justo laoreet sit amet cursus. Morbi tristique
            senectus et netus et malesuada fames ac turpis. Nec nam aliquam sem
            et tortor consequat.
          </Text>

          <Group spacing={6} className="text-base font-normal">
            {`Find out more in this`}
            <a
              key={1}
              className="text-base font-normal text-blue-500"
              target="_blank"
              rel="noopener noreferrer"
              href={
                "https://www.channelnewsasia.com/singapore/cna-explains-article-156-singapore-constitution-protect-marriage-repeal-377a-3019261"
              }
            >
              <Text className="text-base font-normal text-blue-500">
                article
              </Text>
            </a>
          </Group>
          <Text>Update of your Statistics</Text>
          <Group position="apart" className="w-full h-full ">
            <Group spacing={6} className="text-base font-semi-bold ">
              <Text>Cash</Text>
              <div className="pt-1">
                <IncrementChip increment={-20} />
              </div>
            </Group>
            <Group spacing={6} className="text-lg font-semi-bold ">
              <Text>Morale</Text>
              <div className="pt-1">
                <IncrementChip increment={5} />
              </div>
            </Group>
            <Group spacing={6} className="text-base font-semi-bold">
              <Text>Sustainability</Text>
              <div className="pt-1">
                <IncrementChip increment={-8} />
              </div>
            </Group>
          </Group>
          <div></div>
          <Button
            className="bg-darkGreen-50 text-white w-1/8 self-center "
            onClick={handleClose}
          >
            Continue
          </Button>
        </Stack>
      </Modal>
    </>
  );
}